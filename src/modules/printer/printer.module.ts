import { Module } from '@nestjs/common';
import { POS_PRINTER } from 'src/constants';
import {
  ThermalPrinter,
  PrinterTypes,
  CharacterSet,
  BreakLine,
} from 'node-thermal-printer';

@Module({
  providers: [
    {
      provide: POS_PRINTER,
      useFactory: () => {
        const printer = new ThermalPrinter({
          type: PrinterTypes.EPSON,
          interface: '//localhost/POS',
          characterSet: CharacterSet.PC437_USA,
          lineCharacter: '=',
          breakLine: BreakLine.WORD,
          options: {
            timeout: 5000,
          },
        });
        return printer;
      },
    },
  ],
  exports: [POS_PRINTER],
})
export class PrinterModule {}
