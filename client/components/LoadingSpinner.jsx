// React Loader Spinner Import
import { BallTriangle } from 'react-loader-spinner'

export default function LoadingSpinner() {
  return (
    <div style={{ minHeight: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <BallTriangle
        color="goldenrod"
      />
    </div>
  )
}