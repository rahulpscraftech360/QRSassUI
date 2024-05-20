<div className="container flex flex-col w-1/2  gap-2">
  {status !== "Completed" && <InvitationOptionsModal />}{" "}
  {status !== "Completed" && (
    <Button
      onClick={() => {
        navigate("addParticipants");
      }}
      size="lg"
      variant="outline"
    >
      <UserPlusIcon className="w-4 h-4 mr-2 inline-block" />
      Add Participants
    </Button>
  )}
  {status !== "Completed" && (
    <Button
      onClick={() => {
        navigate("tabPreview");
      }}
      size="lg"
      variant="outline"
    >
      <ScanLine className="w-4 h-4 mr-2 inline-block" />
      Scanner Template
    </Button>
  )}
  {status !== "Completed" && (
    <Button
      onClick={() => {
        navigate("addTicket");
      }}
      size="lg"
      variant="outline"
    >
      <TicketIcon className="w-4 h-4 mr-2 inline-block" />
      Add Ticket
    </Button>
  )}
  <Button
    onClick={() => {
      navigate(`/events/share/${eventId}`);
    }}
    size="lg"
    variant="outline"
  >
    <UserPlusIcon className="w-4 h-4 mr-2 inline-block" />
    Share
  </Button>
  {/* <Button
onClick={() => {
  handleDelete(`${eventId}`);
}}
size="lg"
variant="outline"
>
<DeleteIcon className="w-4 h-4 mr-2 inline-block" />
Delete
</Button> */}
  <Button className="w-auto" variant="outline">
    <DeleteIcon className="w-4 h-4 mr-2 inline-block" />
    <DeleteEventModal eventId={eventData.id} />
  </Button>
  {status !== "Completed" && (
    <Button
      onClick={() => {
        console.log("Updated");
        navigate(`/events/update/${eventData.id}`); // Use history.push for redirection
      }}
      className="w-auto"
      variant="outline"
    >
      <FileEditIcon className="w-4 h-4 mr-2 inline-block" /> Update Event
    </Button>
  )}
  <Button
    onClick={() => {
      console.log("navigate");
      navigate(`/scan/events/${eventData.id}`);
    }}
    className="w-full md:w-auto"
    variant="outline"
  >
    <UsersIcon className="w-4 h-4 mr-2 inline-block" />
    Scan QR Codes
  </Button>
  {status !== "Completed" && <NotificationModal />}{" "}
  {status !== "Completed" && <AgendaModal agenda={eventData} />}{" "}
</div>;
