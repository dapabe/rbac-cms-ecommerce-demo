import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/common/ZodValidation.pipe';
import { AuthDTO, IAuthDTOSchema } from '@mono/shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(AuthDTO.LogIn))
  login(@Body() authDto: IAuthDTOSchema['LogIn']) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unnecessary-type-assertion
    return this.authService.login(authDto.username!, authDto.password!);
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
