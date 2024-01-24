"use client";

import { useEffect, useState } from "react";

import CreateServerModal from "@/components/model/create-server-modal";
import InviteModal from "@/components/model/invite-modal";
import EditServerModal from "@/components/model/edit-server-modal";
import MembersModal from "@/components/model/members-modal";
import CreateChannelModal from "@/components/model/create-channel-modal";
import LeaveServerModal from "@/components/model/leave-server-modal";
import DeleteServerModal from "@/components/model/delete-server-modal";
import DeleteChannelModal from "@/components/model/delete-channel-modal";
import EditChannelModal from "@/components/model/edit-channel-modal";
import MessageFileModal from "@/components/model/message-file-modal";
import { DeleteMessageModal } from "@/components//model/delete-message-modal";

export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal/>
      <DeleteMessageModal/>
    </>
  );
};
