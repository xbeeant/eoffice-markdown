export type PermissionProps = {
  comment: boolean;
  download: boolean;
  edit: boolean;
  print: boolean;
  share: boolean;
  view: boolean;
};

export type ApiResponse = {
  code: number;
  data: {
    createAt: string;
    createBy: string;
    deleted: boolean;
    displayOrder: number;
    extension: string;
    fid: string;
    key: string;
    name: string;
    path: string;
    perm: PermissionProps;
    rid: string;
    sid: string;
    size: string;
    updateAt: string;
    updateBy: string;
    url: string;
  };
  msg: string;
  success: boolean;
};
