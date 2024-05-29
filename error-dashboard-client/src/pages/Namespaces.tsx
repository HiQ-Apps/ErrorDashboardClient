import { useState } from "react";

import CreateNamespaceForm from "forms/CreateNamespaceForm";
import Modal from "components/base/Modal/Modal";
import BaseButton from "components/base/Button/Button";
import NamespaceDataTable from "components/composite/NamespaceDataTable/NamespaceDataTable";

const Namespaces = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNamespaceClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>Namespaces</h1>
      <BaseButton
        content="Create Namespace"
        onClick={handleNamespaceClick}
        variant="default"
      />
      <Modal
        header="Create Namespace"
        content={<CreateNamespaceForm onClose={handleNamespaceClick} />}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <NamespaceDataTable />
    </div>
  );
};

export default Namespaces;
