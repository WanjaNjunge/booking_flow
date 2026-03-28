import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useApi from './useApi';

describe('useApi', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('has correct initial state', () => {
    const { result } = renderHook(() => useApi());
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets loading=true during fetch and false after success', async () => {
    const mockData = { addresses: [] };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    }));

    const { result } = renderHook(() => useApi());

    let promise;
    act(() => {
      promise = result.current.execute('/api/test');
    });

    expect(result.current.loading).toBe(true);
    await act(async () => { await promise; });
    expect(result.current.loading).toBe(false);
  });

  it('populates data on successful response', async () => {
    const mockData = { addresses: ['addr_1'] };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    }));

    const { result } = renderHook(() => useApi());
    await act(async () => { await result.current.execute('/api/test'); });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('sets error on network failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));

    const { result } = renderHook(() => useApi());
    await act(async () => { await result.current.execute('/api/test'); });

    expect(result.current.error).toBe('Network error');
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('sets error on non-2xx response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal Server Error' }),
    }));

    const { result } = renderHook(() => useApi());
    await act(async () => { await result.current.execute('/api/test'); });

    expect(result.current.error).toBe('Internal Server Error');
    expect(result.current.data).toBeNull();
  });

  it('retry() re-executes the last call', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal('fetch', mockFetch);

    const { result } = renderHook(() => useApi());
    await act(async () => { await result.current.execute('/api/test', { method: 'GET' }); });
    await act(async () => { await result.current.retry(); });

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch.mock.calls[1][0]).toBe('/api/test');
  });
});
