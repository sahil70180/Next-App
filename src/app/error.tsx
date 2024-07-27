"use client"; // Error components must be Client Components
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
}) {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <h1>{error?.message}</h1>
          <h2 className="display-4 fw-bold">Something went wrong!</h2>
          <p>Opps Something went wrong</p>
          <button className="btn btn-primary"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset?.()
            }
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
