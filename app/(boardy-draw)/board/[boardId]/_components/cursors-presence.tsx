"use client";

import { memo } from "react";
import { shallow } from "@liveblocks/react";

import { useOthers } from "@/liveblocks.config";
import { colorToCss, connectionIdToColor } from "@/lib/utils";

import { RemoteCursor } from "./remote-cursor";
import { Path } from "./path";

const Cursors = () => {
  const others = useOthers(
    (list) =>
      list
        .filter((o) => o.presence.cursor != null)
        .map((o) => ({
          connectionId: o.connectionId,
          cursor: o.presence.cursor!,
          name: o.info?.name ?? "Teammate",
          color: connectionIdToColor(o.connectionId),
        })),
    shallow,
  );

  return (
    <>
      {others.map((o) => (
        <RemoteCursor
          key={o.connectionId}
          x={o.cursor.x}
          y={o.cursor.y}
          name={o.name}
          color={o.color}
        />
      ))}
    </>
  );
};

const Drafts = () => {
  const others = useOthers(
    (list) =>
      list
        .filter((o) => o.presence.pencilDraft != null && o.presence.pencilDraft.length > 0)
        .map((o) => ({
          connectionId: o.connectionId,
          pencilDraft: o.presence.pencilDraft!,
          penColor: o.presence.penColor,
        })),
    shallow,
  );

  return (
    <>
      {others.map((o) => (
        <Path
          key={o.connectionId}
          x={0}
          y={0}
          points={o.pencilDraft}
          fill={
            o.penColor ? colorToCss(o.penColor) : "#000"
          }
        />
      ))}
    </>
  );
};

export const CursorsPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";
