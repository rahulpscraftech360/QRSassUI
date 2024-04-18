// SignInPage.js
import { SignIn, useSession } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
export default function SignInPage() {
  const { session } = useSession();

  useEffect(() => {
    console.log("here >>>> useEffect");
    if (session) {
      const sessionId = session.id;
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      // Send the session ID to your backend
      axios
        .post("http://localhost:5000/store-user", {
          body: JSON.stringify({ sessionId }),
        })
        .then((response) => {
          // Handle response
          console.log("first>>>><<<<<<<<>>>>>>", "resposnse", response);
        })
        .catch((error) => {
          // Handle error
        });
    }
  }, [session]);

  // return <SignIn />;
  return (
    <div className="flex flex-col-reverse gap-10 min-h-[400px] md:gap-20 lg:grid lg:grid-cols-2 lg:items-center lg:min-h-screen xl:gap-0">
      <div className="flex flex-1 min-h-[400px]">
        <img
          alt="Image"
          className="aspect-2 object-cover rounded-lg"
          height="400"
          src="/src/assets/aZBF4vrb2Ds.jpg"
          width="600"
        />
      </div>
      <div className="flex flex-1 items-center justify-center py-12">
        <SignIn />
      </div>
    </div>
  );
}
