import { useCallback, useEffect, useState } from "react";
import {
    fetchCvData,
    fetchPortfolioItems,
    fetchBlogPosts
} from "../utils/supabaseData.js";

/* =====================================
   CV
===================================== */

export function useCvData() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetchCvData();
            setData(result);
        } catch (fetchError) {
            setError(fetchError.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { data, setData, loading, error, refetch };
}

/* =====================================
   PORTFOLIO
===================================== */

export function usePortfolioItems({ onlyPublished = false } = {}) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetchPortfolioItems({ onlyPublished });
            setItems(result);
        } catch (fetchError) {
            setError(fetchError.message);
        } finally {
            setLoading(false);
        }
    }, [onlyPublished]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { items, setItems, loading, error, refetch };
}

/* =====================================
   BLOGS
===================================== */

export function useBlogPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetchBlogPosts();
            setPosts(result);
        } catch (fetchError) {
            setError(fetchError.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { posts, setPosts, loading, error, refetch };
}
