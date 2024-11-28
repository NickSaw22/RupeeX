import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function p2pTransfersLinked() {
    const session = await getServerSession(authOptions);
    const merchantId = session?.user?.id;

    if (!merchantId) {
        return { sentTransfers: [], receivedTransfers: [] };
    }

    // Fetch p2p transfers where the logged-in user is either sender or receiver
    const sentTransfers = await prisma.p2pTransfer.findMany({
        where: { fromMerchantId: Number(merchantId) },
    });

    const receivedTransfers = await prisma.p2pTransfer.findMany({
        where: { toMerchantId: Number(merchantId) },
    });

    return { sentTransfers, receivedTransfers };
}
