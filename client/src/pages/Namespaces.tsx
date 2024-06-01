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
    <div className="flex flex-col min-h-screen w-11/12">
      <div className="flex flex-col my-4">
        <h1 className="my-2 dark:text-slate-100">Namespaces</h1>
        <BaseButton
          content="Create Namespace"
          onClick={handleNamespaceClick}
          variant="default"
          override_styles="max-w-40"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <Modal
          header="Create Namespace"
          content={<CreateNamespaceForm onClose={handleNamespaceClick} />}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <NamespaceDataTable />
      </div>
    </div>
  );
};

export default Namespaces;
