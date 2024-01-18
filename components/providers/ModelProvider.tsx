"use client";

import CreateServerModal from "@/components/model/create-server-modal";
import { useEffect, useState } from "react";
import InviteModal from "@/components/model/invite-modal";
import EditServerModal from "@/components/model/edit-server-modal";

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
    </>
  );
};
