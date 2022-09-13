/* eslint-disable @typescript-eslint/naming-convention */
export interface Publish{
  id_postagem?: number;
  titulo?: string;
  imagem?: string;
  descricao?: string;
  curtidas?: number;
  visualizacoes?: number;
  data_publicacao?: string;
  materia?: string;
  nivelEnsino?: string;
  id_usuario?: string;
  file?: Blob;
}
