import { UploadIcon } from '@heroicons/react/outline'

function UploadStarted() {
  return (
    <div className="flex flex-row items-center justify-center space-x-1">
      <UploadIcon className="h-4 w-4" />
      <div>Uploading...</div>
    </div>
  )
}

export default UploadStarted
