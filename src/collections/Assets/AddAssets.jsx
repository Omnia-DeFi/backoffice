import { Button, Modal } from "antd";
import { useState } from "react";
import { AddAssetForm } from "../Form";

export const AddAssets = ({
  editMode,
  setEditMode,
  setAssets,
  collection,
  showModal,
  setShowModal,
  asset,
  users,
  setAsset,
}) => {
  const [key, setKey] = useState(0);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [floorArea, setFloorArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [otherRooms, setOtherRooms] = useState("");
  const [floorPrice, setFloorPrice] = useState("");
  const [saleTimeframe, setSaleTimeframe] = useState("");
  const [extraConditionsLabels, setExtraConditionsLabels] = useState("");
  const [extraConditionsDescriptions, setExtraConditionsDescriptions] =
    useState("");
  // const [floorArea, setFloorArea] = useState("");
  const [loading, setLoading] = useState(false);
  const [AVMUrl, setAVMUrl] = useState("");
  const [surveyProofUrl, setSurveyProofUrl] = useState("");
  const [landRegistryUrl, setLandRegistryUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]);

  async function create(e) {
    setLoading(true);
    e.preventDefault();
    setLoading(true);
    const data = {
      selectedUsers,
      title,
      description,
      floorArea,
      bedrooms,
      bathrooms,
      otherRooms,
      floorPrice,
      saleTimeframe,
      extraConditionsLabels,
      extraConditionsDescriptions,
      // floorArea,
      AVM: AVMUrl,
      surveyProof: surveyProofUrl,
      landRegistry: landRegistryUrl,
      images: imageUrls,
      read: true,
    };
    try {
      fetch(`/api/${collection}/create`, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Data", data);
          setAssets((prevData) => [...prevData, data.createdAsset]);
          setLoading(false);
          setShowModal(false);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const saveDataUpdate = () => {
    console.log("Save Data Update");
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setShowModal(true);
          setKey(key + 1);
        }}
      >
        Add
      </Button>

      {showModal && (
        <Modal
          key={key}
          confirmLoading={loading}
          open={showModal}
          title={editMode ? "Edit Asset" : "Add Asset"}
          okText={editMode ? "Edit Asset" : "Add Asset"}
          onOk={editMode ? saveDataUpdate : create}
          onCancel={() => {
            setShowModal(false);
            setAsset({});
            setEditMode(false);
          }}
        >
          <AddAssetForm
            users={users}
            setSelectedUsers={setSelectedUsers}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            floorArea={floorArea}
            setFloorArea={setFloorArea}
            bedrooms={bedrooms}
            setBedrooms={setBedrooms}
            bathrooms={bathrooms}
            setBathrooms={setBathrooms}
            otherRooms={otherRooms}
            setOtherRooms={setOtherRooms}
            floorPrice={floorPrice}
            setFloorPrice={setFloorPrice}
            saleTimeframe={saleTimeframe}
            setSaleTimeframe={setSaleTimeframe}
            extraConditionsLabels={extraConditionsLabels}
            setExtraConditionsLabels={setExtraConditionsLabels}
            extraConditionsDescriptions={extraConditionsDescriptions}
            setExtraConditionsDescriptions={setExtraConditionsDescriptions}
            // floorArea={floorArea}
            // setFloorArea={setFloorArea}
            setAVMUrl={setAVMUrl}
            setSurveyProofUrl={setSurveyProofUrl}
            setLandRegistryUrl={setLandRegistryUrl}
            setImageUrls={setImageUrls}
          />
        </Modal>
      )}
    </div>
  );
};
