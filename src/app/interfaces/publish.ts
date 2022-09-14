/* eslint-disable @typescript-eslint/naming-convention */
export interface Publish{
  titulo?: string;
  imagem?: string;
  descricao?: string;
  curtidas?: number;
  visualizacoes?: number;
  dataPublicacao?: string;
  materia?: string;
  nivelEnsino?: string;
  id_usuario?: string;
  file?: File;
}
