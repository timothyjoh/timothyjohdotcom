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
			className="border-2 bg-white/30 px-3 text-sm shadow-lg backdrop-blur-md"
			style={{
				borderColor: color ?? "gray",
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
			{$user.name}
			{children}
		</Cursors>
	);
};

const cursorsClassNames =
	"absolute top-0 right-0 h-screen z-50 font-mono text-sm text-gray-800 border border-red-200 border-4";
