import { useEffect, useState } from 'react'
import { useMoralis, useMoralisFile } from 'react-moralis'

function Modal() {
  const {
    Moralis,
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
    user,
    setUserData,
    isUserUpdating,
  } = useMoralis()

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const socials = document.getElementById('socials').value
    // const data = document.getElementById('avatar').files[0]
    // const avatar = new Moralis.File(data.name, data)
    // await avatar.saveIPFS()

    await setUserData({
      username,
      email,
      url: socials,
      // file: avatar,
      // avatar,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex w-96 flex-col items-center justify-center space-y-2 text-center"
    >
      <h1>Username</h1>
      <div className="z-50 flex w-9/12 max-w-2xl flex-col rounded-full border-2 border-blue-300/50 bg-transparent px-4 py-1 opacity-95 shadow-xl hover:border-blue-800">
        <input
          type="text"
          id="username"
          name="username"
          className="bg-transparent outline-none"
          placeholder={user.get('username')}
        />
      </div>
      <h1>Email</h1>
      <div className="z-50 flex w-9/12 max-w-2xl flex-col rounded-full border-2 border-blue-300/50 bg-transparent px-4 py-1 opacity-95 shadow-xl hover:border-blue-800">
        <input
          type="text"
          id="email"
          name="email"
          className="bg-transparent outline-none"
          placeholder="example@email.com"
        />
      </div>
      <h1>Organisation Website</h1>
      <div className="z-50 flex w-9/12 max-w-2xl flex-col rounded-full border-2 border-blue-300/50 bg-transparent px-4 py-1  opacity-95 shadow-xl hover:border-blue-800">
        <input
          type="text"
          id="socials"
          name="socials"
          placeholder="https://insertlink.com"
          className="bg-transparent outline-none"
        />
      </div>
      <h1>Profile Picture</h1>
      <div className="z-50 flex w-9/12 flex-row items-center justify-between rounded-full border-2 border-blue-300/50 py-1 pl-4  opacity-95 shadow-xl hover:border-blue-800">
        <input
          id="avatar"
          name="avatar"
          type="file"
          placeholder=""
          className="bg-transparent text-xs outline-none"
        />
      </div>
      <div className="relative flex w-24  flex-col lg:mx-auto">
        <button
          type="submit"
          className="mt-4 rounded-full border-b-2 border-black bg-blue-300 text-sm 
                text-black hover:shadow-xl active:border-b active:border-blue-300 active:bg-blue-700 active:text-white"
          disabled={isUserUpdating}
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default Modal