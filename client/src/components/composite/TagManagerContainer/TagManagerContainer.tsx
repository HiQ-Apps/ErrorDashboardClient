import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  openModal,
  closeModal,
  selectIsOpen,
  selectModalType,
} from "features/modalSlice";
import { Modal, Tag, BaseButton } from "components/base";
import { useToast } from "components/ui/use-toast";
import CreateTagForm from "forms/CreateTagForm";
import type { TagType } from "types/Tag";
import { ScrollArea } from "components/ui/scroll-area";
import { useDeleteTagMutation } from "features/tagApiSlice";

interface TagManagerContainerProps {
  tags: TagType[];
}

const TagManagerContainer = ({ tags }: TagManagerContainerProps) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen);
  const modalType = useSelector(selectModalType);
  const { toast } = useToast();

  if (!id) {
    throw new Error("Error ID is required for tag manager");
  }

  const handleOpenCreateTagModal = () => {
    dispatch(
      openModal({
        modalType: "createTag",
      })
    );
  };

  const handleCloseCreateTagModal = () => {
    dispatch(closeModal());
  };

  const [deleteTag] = useDeleteTagMutation();

  const handleDeleteTag = async (tagId: string) => {
    try {
      await deleteTag(tagId).unwrap();
      toast({
        title: "Tag deleted successfully",
      });
    } catch (err) {
      toast({
        title: "Failed to delete tag",
      });
    }
  };

  return (
    <div className="flex flex-col">
      <BaseButton
        content="Create Tag"
        size="sm"
        variant="default"
        onClick={handleOpenCreateTagModal}
        overrideStyles="my-4 px-3"
      />
      <ScrollArea className="h-[100px] whitespace-nowrap rounded-md border">
        {tags.length === 0 && (
          <div className="text-center text-2xs p-4">No tags found</div>
        )}
        {tags.map((tag) => (
          <div key={tag.id} className="relative px-4">
            <div
              key={tag.id}
              onClick={() => handleDeleteTag(tag.id)}
              className="cursor-pointer text-2xs absolute h-5 w-5 bg-red-500 rounded-full right-3 top-0 flex justify-center items-center text-center font-semibold hover:bg-red-600 "
            >
              X
            </div>
            <Tag
              tagKey={tag.tagKey}
              tagValue={tag.tagValue}
              tagColor={tag.tagColor}
            />
          </div>
        ))}
      </ScrollArea>
      <Modal
        header="Create Tag"
        content={<CreateTagForm onClose={handleCloseCreateTagModal} />}
        open={isOpen && modalType === "createTag"}
        onClose={handleCloseCreateTagModal}
        onConfirm={handleOpenCreateTagModal}
      />
    </div>
  );
};

export default TagManagerContainer;
