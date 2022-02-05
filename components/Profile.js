import CardProfile from './CardProfile'
import Bottom from './Bottom'

function Profile() {
  return (
    <div className="flex h-screen w-full flex-col items-center">
      <h1 className="mt-4 mb-8 text-xl font-extrabold italic text-gray-600">
        Profile
      </h1>
      <div className="flex w-9/12 flex-col">
        <CardProfile />
      </div>
      <div className="mt-16 flex flex-col items-center justify-center">
        <Bottom />
      </div>
    </div>
  )
}

export default Profile
