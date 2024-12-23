import { useEffect, useState } from 'react'

const useImage = (fileName: string) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<unknown>(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await import(`../assets/${fileName}.jpg`);
                setImage(response.default)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchImage()
    }, [fileName])

    return {
        loading,
        error,
        image,
    }
}

export default useImage