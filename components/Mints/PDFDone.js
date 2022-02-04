import { RefreshIcon } from '@heroicons/react/outline'

function PDFDone() {
  return (
    <div className="flex flex-row items-center justify-center space-x-1">
      <div>PDF done, confirming...</div>
      <RefreshIcon className="h-4 w-4" />
    </div>
  )
}

export default PDFDone
