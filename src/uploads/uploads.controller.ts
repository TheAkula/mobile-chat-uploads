import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UploadFileDto } from './dto/upload-file.dto';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @Post()
  uploadFile(@Body() uploadFileDto: UploadFileDto): Promise<string> {
    return this.uploadsService.uploadFile(uploadFileDto);
  }

  @Get(':id')
  getFile(@Res() res: Response, @Param('id') id: string) {
    return res.sendFile(this.uploadsService.getFile(id));
  }
}
