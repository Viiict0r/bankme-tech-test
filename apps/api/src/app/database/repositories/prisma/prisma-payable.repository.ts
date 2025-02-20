import { Injectable } from '@nestjs/common';
import {
  PayableRepository,
  PayableWithAssignorName,
} from '../payable.repository';
import { Payable } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class PrismaPayableRepository implements PayableRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Payable> {
    const payable = await this.prisma.payable.findUnique({
      where: {
        id,
      },
    });

    return payable;
  }

  async findByIdWithAssignorName(id: string): Promise<PayableWithAssignorName> {
    const payable = await this.prisma.payable.findUnique({
      where: {
        id,
      },
      include: {
        assignor: {
          select: {
            name: true,
          },
        },
      },
    });

    return payable;
  }

  async findByAssignor(assignorId: string): Promise<Payable[]> {
    const payables = await this.prisma.payable.findMany({
      where: {
        assignorId,
      },
    });

    return payables;
  }

  async create(data: Payable): Promise<Payable> {
    const payable = await this.prisma.payable.create({
      data,
    });

    return payable;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.payable.delete({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<Payable[]> {
    const payables = await this.prisma.payable.findMany();

    return payables;
  }

  async update(id: string, data: Partial<Payable>): Promise<Payable> {
    const updated = await this.prisma.payable.update({
      data,
      where: {
        id,
      },
    });

    return updated;
  }
}
