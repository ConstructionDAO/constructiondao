import { CheckCircleIcon } from '@heroicons/react/outline'

function UploadConfirmed() {
  return (
    <div className="flex flex-row items-center justify-center space-x-1">
      <div>Upload Confirmed</div>
      <CheckCircleIcon className="h-4 w-4" />
    </div>
  )
}

export default UploadConfirmed
