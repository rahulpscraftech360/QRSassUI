import React from "react";

function WhatsAppShareButton({ link }) {
  console.log(link);
  const message = `Check out this cool website: ${link}`;

  const handleWhatsAppShare = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `whatsapp://send?text=${encodedMessage}`;
    window.location.href = whatsappLink;
  };

  return (
    <button onClick={handleWhatsAppShare}>
      <MessageSquareIcon className="h-6 w-6 text-blue-600" />
    </button>
  );
}

export default WhatsAppShareButton;

function MessageSquareIcon(props) {
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
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
