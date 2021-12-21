import type { PermissionProps } from '@/component/markdown';
import MarkdownEditor from '@/component/markdown';

import { useEffect, useState } from 'react';
import { request } from 'umi';
import { message, Skeleton } from 'antd';

interface LocationProps extends Location {
  query: { rid: string; sid: string };
}

const Index: ({ location }: { location: LocationProps }) => JSX.Element = ({ location }) => {
  const {
    query: { rid },
  } = location;
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<string>('');
  const [permission, setPermission] = useState<PermissionProps>({
    copy: true,
    print: true,
    download: true,
    edit: true,
  });

  const loadData = async () => {
    setLoading(true);
    if (rid) {
      const response = await request('/api/resource/detail', {
        params: {
          rid,
        },
      });
      if (response.success) {
        setPermission({
          copy: true,
          print: true,
          download: true,
          edit: true,
        });
        // load content from url
        const downloaded = await request(response.data.url);
        setData(downloaded);
      }
    }
  };

  useEffect(() => {
    loadData().then(() => setLoading(false));
  }, [rid]);

  return (
    <div>
      {loading && <Skeleton />}
      {!loading &&
        (rid ? (
          <div
            style={{
              height: '100%',
            }}
          >
            <MarkdownEditor
              value={data}
              rid={rid}
              imageUploadURL={'/api/resource/detail'}
              mode={permission.edit ? 'edit' : 'view'}
              onSave={(value) => {
                request('/api/resource', {
                  method: 'POST',
                  requestType: 'form',
                  data: {
                    rid,
                    value,
                  },
                }).then((response) => {
                  if (response.success) {
                    message.success(response.msg);
                  } else {
                    message.error(response.msg);
                  }
                });
              }}
            />
          </div>
        ) : (
          <div>参数不全</div>
        ))}
    </div>
  );
};

export default Index;
