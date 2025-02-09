"use client";
import { init, Cursors } from "@instantdb/react";
import { atomLocal, useStore } from "@/lib/atoms";
import { fakeColor, fakeName } from "@/lib/fakeName";

const APP_ID = import.meta.env.PUBLIC_INSTANTDB_APP_ID;

const db = init({ appId: APP_ID });
const room = db.room("cursors-example", "123");

type UserCursor = { name: string };
const user = atomLocal<UserCursor>("user", { name: fakeName() });
user.set({ name: fakeName() });
function CustomCursor({ color, name }: { color?: string; name: string }) {
	return (
		<span
			className="rounded-r-md rounded-b-md px-3 text-xs font-mono"
			style={{
				backgroundColor: color ?? "gray",
			}}
		>
			{name}
		</span>
	);
}
export const CursorBattle = ({ children }: { children: React.ReactNode }) => {
	const $user = useStore(user);
	db.rooms.useSyncPresence(room, {
		name: $user.name,
	});

	return (
		<Cursors
			room={room}
			renderCursor={(props) => (
				<CustomCursor color={props.color} name={props.presence.name} />
			)}
			userCursorColor={fakeColor()}
			className={cursorsClassNames}
		>
			{/* {$user.name} */}
			{children}
		</Cursors>
	);
};

const cursorsClassNames = "absolute flex flex-end top-0 right-0 h-screen z-50";
