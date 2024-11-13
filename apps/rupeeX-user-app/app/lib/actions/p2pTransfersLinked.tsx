import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function p2pTransfersLinked() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return { sentTransfers: [], receivedTransfers: [] };
    }

    // Fetch p2p transfers where the logged-in user is either sender or receiver
    const sentTransfers = await prisma.p2pTransfer.findMany({
        where: { fromUserId: Number(userId) },
    });

    const receivedTransfers = await prisma.p2pTransfer.findMany({
        where: { toUserId: Number(userId) },
    });

    return { sentTransfers, receivedTransfers };
}
