import { ApiProperty } from "@nestjs/swagger";

export class EmailDto {

  @ApiProperty({type: String})  
  email: string;

  @ApiProperty({type: String}) 
  mensagem: string;
} 