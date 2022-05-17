import { getProviders, signIn } from "next-auth/react";

// server-side render of the given providers, props get passed to component before render
export async function getServerSideProps() {
  const providers = await getProviders();
  // console.log(providers, "providers in login.js");

  return {
    props: { providers },
  };
}

function Login({ providers }) {
  console.log(providers, "providers in login.js");
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img
        className="w-40 mb-5"
        src="https://links.papareact.com/9xl"
        alt="spotify-logo"
      />

      {Object.values(providers).map((provider) => (
      <div key={provider.name}>
        <button
          className="bg-[#18D860] text-white p-5 rounded-full"
          onClick={() => signIn(provider.id, { callbackUrl: "/"})}
        >
          Login with {provider.name}
        </button>
      </div>
      ))}  
    </div>
  );
}

export default Login;
