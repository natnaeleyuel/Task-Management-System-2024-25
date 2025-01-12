import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2'

@Injectable()
export class ManagerSeeder {
  constructor(private prisma: PrismaService) {}

  async seedManagers() {
    const groups = [
      {
        name: 'Project-Based Tasks',
        managerEmail: 'admin1@example.com',
        managerPassword:  await argon.hash('password123'),
        role: 'manager',
        firstname: 'Admin',
        lastname: 'One',
      },
      {
        name: 'Maintenance Tasks',
        managerEmail: 'admin2@example.com',
        managerPassword: await argon.hash('password123'),
        role: 'manager',
        firstname: 'Admin',
        lastname: 'Two',
      },
      {
        name: 'Creative Tasks',
        managerEmail: 'admin3@example.com',
        managerPassword: await argon.hash('password123'),
        role: 'manager',
        firstname: 'Admin',
        lastname: 'Three',
      },
      {
        name: 'Operational Tasks',
        managerEmail: 'admin4@example.com',
        managerPassword: await argon.hash('password123'),
        role: 'manager',
        firstname: 'Admin',
        lastname: 'Four',
      },
    ];
  
    for (const group of groups) {
      // Check if the manager exists
      const existingManager = await this.prisma.user.findUnique({
        where: { email: group.managerEmail },
      });
  
      if (existingManager) {
        // Check if the manager is already assigned to a group
        const existingGroup = await this.prisma.group.findFirst({
          where: { managerId: existingManager.id },
        });
  
        if (existingGroup) {
          console.log(
            `Manager with email ${group.managerEmail} is already assigned to the group '${existingGroup.name}'.`
          );
          continue; // Skip this group creation
        }
      }
  
      // Upsert the manager to ensure it exists
      const manager = await this.prisma.user.upsert({
        where: { email: group.managerEmail },
        update: {},
        create: {
          email: group.managerEmail,
          password: group.managerPassword,
          role: group.role,
          firstname: group.firstname,
          lastname: group.lastname,
        },
      });
  
      // Create the group with the manager
      await this.prisma.group.create({
        data: {
          name: group.name,
          manager: {
            connect: { id: manager.id },
          },
        },
      });
  
      console.log(`Group '${group.name}' created with manager '${group.managerEmail}'.`);
    }
  
    console.log('Managers and groups successfully seeded!');
  }
  
}
