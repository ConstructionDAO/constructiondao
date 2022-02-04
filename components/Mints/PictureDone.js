import { RefreshIcon } from '@heroicons/react/outline'

function PictureDone() {
  return (
    <div className="flex flex-row items-center justify-center space-x-1">
      <div>Picture done, uploading PDF...</div>
      <RefreshIcon className="h-4 w-4" />
    </div>
  )
}

export default PictureDone
