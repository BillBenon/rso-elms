import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import Avatar from '../../../components/Atoms/custom/Avatar';
import Button from '../../../components/Atoms/custom/Button';
import Icon from '../../../components/Atoms/custom/Icon';
import FileUploader from '../../../components/Atoms/Input/FileUploader';
import Heading from '../../../components/Atoms/Text/Heading';
import usersStore from '../../../store/administration/users.store';
import { UserInfo } from '../../../types/services/user.types';
import { getImage, invalidateCacheImage } from '../../../utils/file-util';

function UpdatePhotoProfile({ user }: { user: UserInfo }) {
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const { mutateAsync: mutateAddProfile } = usersStore.addProfile();

  const handleUpload = (files: FileList | null) => {
    setProfileFile(files ? files[0] : null);
  };

  const [profileSrc, setProfileSrc] = useState('');

  getImage(user.profile_attachment_id, user.id.toString()).then((imageSrc) => {
    setProfileSrc(imageSrc);
  });

  const history = useHistory();

  async function handleSubmit() {
    if (profileFile !== null) {
      let toastId = toast.loading('Uploading photo....');
      let data = new FormData();

      data.append('description', `${user.username} s public logo`);
      data.append('purpose', 'Add an identifier for user');
      data.append('profileFile', profileFile);

      await mutateAddProfile(
        { id: user.id + '', info: data },
        {
          onSuccess(data) {
            toast.success('succesfully uploaded', { id: toastId });
            console.log(data.data.profile_attachment_id);
            invalidateCacheImage(
              data.data.profile_attachment_id,
              user.id.toString(),
            ).then((img) => {
              setProfileSrc(img);
            });
            history.goBack();
          },
          onError(error: any) {
            toast.error(error.response.data.message, { id: toastId });
          },
        },
      );
    } else {
      toast.error('No file uploaded');
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Heading className="py-4">
        {user.first_name + ' ' + user.last_name}&apos;s profile
      </Heading>
      <div className="flex flex-col items-center w-32">
        <Avatar
          className="border-4 object-cover border-primary-500"
          size="120"
          src={profileSrc || '../../../../public/images/fall_back_prof_pic.jpg'}
          alt="photo"
        />
        <div className="self-end -mt-3">
          <FileUploader
            allowPreview={false}
            handleUpload={handleUpload}
            accept={'image/jpeg, image/png'}>
            <Button styleType="text" type="button" className="-mt-8">
              <Icon
                bgColor="main"
                size={20}
                useheightandpadding={false}
                className="rounded-2xl p-5"
                fill="primary"
                name="camera"
              />
            </Button>
          </FileUploader>
        </div>
      </div>
      <Button className="mt-4" onClick={handleSubmit}>
        Save Photo
      </Button>
    </div>
  );
}

export default UpdatePhotoProfile;
