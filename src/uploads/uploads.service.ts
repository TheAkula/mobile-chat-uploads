import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import {
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
  readFile,
  ReadStream,
  writeFile,
  WriteStream,
} from 'fs';
import { join } from 'path';
import { appRoot } from 'root';
import { UploadFileDto } from './dto/upload-file.dto';

@Injectable()
export class UploadsService {
  constructor(private configService: ConfigService) {}

  uploadFile({ file, ext }: UploadFileDto): Promise<string> {
    const name = randomUUID();

    return new Promise<string>((resolve) => {
      const dirExists = existsSync(join(appRoot, 'uploads'));

      if (!dirExists) {
        mkdirSync(join(appRoot, 'uploads'));
      }

      const fileName = `${name}.${ext}`;

      writeFile(join(appRoot, 'uploads', fileName), file, 'base64', (err) => {
        if (err) {
          throw new InternalServerErrorException(err);
        }

        return resolve(
          this.configService.get('SERVER_URL') + 'uploads/' + fileName,
        );
      });
    });
  }

  getFile(id: string) {
    const filePath = join(appRoot, 'uploads', id);
    const fileExists = existsSync(filePath);
    if (!fileExists) {
      throw new BadRequestException('File with this name does not exist');
    }
    return filePath;
  }
}
