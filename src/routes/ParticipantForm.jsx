/**
 * v0 by Vercel.
 * @see https://v0.dev/t/8U55LoJtmIo
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ParticipantForm() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Join our Community</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your information to join our community
        </p>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Mobile phone</Label>
            <Input id="phone" placeholder="Enter your phone" type="tel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country code</Label>
            <Input id="country" placeholder="Enter your country" />
          </div>
        </div>
        <Button>Confirm</Button>
      </div>
    </div>
  );
}
