import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import AgendaForm from "./../components/AgendaForm";
import { useState } from "react";

export default function AgendaModal() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="" size="lg" variant="outline">
            <MailIcon className="w-4 h-4 mr-2 inline-block" />
            Add Agenda
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <AgendaForm />
          </DialogHeader>

          {/* <ProfileForm navigate={navigate} /> */}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="lg" variant="outline">
          <MailIcon className="w-4 h-4 mr-2 inline-block" />
          Add Agenda
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          {/* <DrawerTitle>Add Agenda</DrawerTitle> */}

          <AgendaForm />
        </DrawerHeader>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className, navigate }) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Button
          onClick={() => {
            navigate("sendEmailNotification");
          }}
          size="lg"
          variant="outline"
        >
          <MailIcon className="w-4 h-4 mr-2 inline-block" />
          Email
        </Button>
      </div>
      <div className="grid gap-2">
        {" "}
        <Button
          onClick={() => {
            navigate("sendWhatsappNotification");
          }}
          size="lg"
          variant="outline"
        >
          <WhatsAppIcon className="w-4 h-4 mr- inline-block" />
          Whatsapp
        </Button>
      </div>
      <div className="grid gap-2">
        {/* <Button
          onClick={() => {
            navigate("Download QRCode");
          }}
          size="lg"
          variant="outline"
        >
          <MailIcon className="w-4 h-4 mr-2 inline-block" />
          Download QR
        </Button> */}
      </div>
    </form>
  );
}

function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function WhatsAppIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="currentColor"
    >
      <path
        d="M17.472,14.382c-0.262-0.131-1.553-0.767-1.797-0.855c-0.244-0.088-0.421-0.131-0.599,0.131
        c-0.178,0.262-0.689,0.855-0.845,1.033c-0.156,0.178-0.312,0.2-0.575,0.069c-0.821-0.4-1.375-0.711-1.931-1.266
        s-0.864-1.108-1.265-1.931c-0.131-0.262-0.004-0.4,0.103-0.531c0.088-0.088,0.196-0.232,0.294-0.347
        c0.103-0.131,0.131-0.22,0.196-0.367c0.069-0.156,0.035-0.29-0.018-0.406c-0.053-0.118-0.474-1.144-0.649-1.564
        c-0.178-0.422-0.356-0.365-0.486-0.373c-0.118-0.009-0.262-0.009-0.4-0.009c-0.156,0-0.4,0.059-0.61,0.29
        c-0.2,0.221-0.768,0.752-0.768,1.835c0,1.083,0.79,2.125,0.901,2.273c0.118,0.147,1.67,2.543,4.059,3.547
        c0.575,0.242,1.024,0.388,1.375,0.498c0.752,0.236,1.432,0.194,1.972,0.118c0.331-0.047,1.021-0.417,1.163-0.82
        c0.142-0.4,0.142-0.742,0.1-0.815C17.895,14.612,17.734,14.513,17.472,14.382z M12.004,21.005c-4.97,0-9-4.03-9-9
        c0-4.97,4.03-9,9-9s9,4.03,9,9C21.004,16.975,16.974,21.005,12.004,21.005z M12.004,4.005c-4.411,0-8,3.589-8,8
        c0,4.411,3.589,8,8,8s8-3.589,8-8C20.004,7.594,16.415,4.005,12.004,4.005z"
      />
    </svg>
  );
}
