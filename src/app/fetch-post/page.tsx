 
"use client"

import { useState, useEffect } from "react"

export default function FetchPostsPage() {
    const [posts, setPosts] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/external")
            .then((res) => res.json())
            .then((data) => {
                if (data.sucess) {
                    setPosts(data.data)
                } else {
                    setError(data.message)
                }
            })
            .catch(() => setError("An unexpected error"))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 hover:text-pink-900">
                Posts
            </h1>
            {loading && (
                <p className="text-center text-gray-500 animate-pulse">
                    Loading...
                </p>
            )}
            {error && (
                <p className="text-center text-red-500 mt-4">
                    {error}
                </p>
            )}
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post: { id: number; title: string; body: string }) => (
                    <li
                        key={post.id}
                        className="bg-pink-200 p-6 shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            {post.title}
                        </h2>
                        <p className="text-gray-600">
                            {post.body}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
 