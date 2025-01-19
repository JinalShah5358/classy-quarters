import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import { Modal } from "../../ui/Modal";

function AddCabin() {
  const [isModelOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsModalOpen((show) => !show)}>
        Add New Cabin
      </Button>

      {isModelOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CreateCabinForm onModalClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
