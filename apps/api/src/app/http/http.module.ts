import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { AssignorModule } from '@/assignor/assignor.module';
import { PayableModule } from '@/payable/payable.module';
import { UserModule } from '@/user/user.module';
import { CreateAssignorController } from './controllers/create-assignor.controller';
import { CreatePayableController } from './controllers/create-payable.controller';
import { GetAssignorByIdController } from './controllers/get-assignor-by-id.controller';
import { DeleteAssignorByIdController } from './controllers/delete-assignor-by-id.controller';
import { UpdateAssignorController } from './controllers/update-assignor.controller';
import { DeletePayableByIdController } from './controllers/delete-payable.controller';
import { GetPayableByIdController } from './controllers/get-payable-by-id.controller';
import { ListPayablesController } from './controllers/list-payables.controller';
import { UpdatePayableController } from './controllers/update-payable.controller';
import { CreateUserController } from './controllers/create-user.controller';
import { AuthenticateController } from './controllers/authenticate.controller';
import { ListAssignorsController } from './controllers/list-assignors.controller';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CreatePayableBatchController } from './controllers/create-payable-batch.controller';

@Module({
  imports: [DatabaseModule, AssignorModule, PayableModule, UserModule],
  controllers: [
    CreateAssignorController,
    CreatePayableController,
    GetAssignorByIdController,
    DeleteAssignorByIdController,
    UpdateAssignorController,
    DeletePayableByIdController,
    GetPayableByIdController,
    ListPayablesController,
    UpdatePayableController,
    CreateUserController,
    AuthenticateController,
    ListAssignorsController,
    CreatePayableBatchController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class HttpModule {}
