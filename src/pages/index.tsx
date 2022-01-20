import MarkdownEditor from '@/component/markdown';

import { useEffect, useState } from 'react';
import { request } from 'umi';
import { message, Result, Skeleton } from 'antd';
import { ApiResponse } from '@/types';

interface LocationProps extends Location {
  query: { rid: string; share: string; mode: 'view' | 'edit'; shareId: string };
}

const Index: ({ location }: { location: LocationProps }) => JSX.Element = ({ location }) => {
  const {
    query: { rid, share, mode, shareId },
  } = location;

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<string>('');
  const [viewMode, setViewMode] = useState<'view' | 'edit'>(mode);
  const [error, setError] = useState<string>();

  const loadData = async () => {
    setLoading(true);
    if (rid || share) {
      const response = await request<ApiResponse>('/api/resource/detail', {
        params: {
          rid,
          share,
          shareId,
        },
        skipErrorHandler: true,
      });

      if (response.success) {
        if (mode === 'edit' && !response.data.perm.edit) {
          setViewMode('view');
        }
        // load content from url
        const downloaded = await request(response.data.url);
        setData(downloaded);
      } else {
        setError(response.msg);
      }
    }
  };

  useEffect(() => {
    loadData().then(() => setLoading(false));
  }, [rid]);

  const renderResult = () => {
    if (error) {
      return <Result status="error" title={error} />;
    }

    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <MarkdownEditor
          value={data}
          rid={rid}
          imageUploadURL={'/api/resource/detail'}
          mode={viewMode}
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
    );
  };

  return (
    <div>
      {loading && <Skeleton />}
      {!loading && (rid || share) ? renderResult() : <div>参数不全</div>}
    </div>
  );
};

export default Index;
