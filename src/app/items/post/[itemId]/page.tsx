import ItemForm from "@/components/ItemForm";
import { TItem } from "@/types";

export default async function PatchItemPage({
  params,
}: {
  params: Promise<{ itemId: TItem["id"] }>;
}) {
  const { itemId } = await params;

  return (
    <div className="flex justify-center m-4">
      <ItemForm itemId={itemId} />
    </div>
  );
}
