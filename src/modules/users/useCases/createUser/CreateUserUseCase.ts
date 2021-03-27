import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    name: string;
    email: string;
}

class CreateUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    execute({ email, name }: IRequest): User {
        // Verifica se já existe um usuário com o mesmo email
        const userAlreadyExists = this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const user = this.usersRepository.create({ email, name });

        return user;
    }
}

export { CreateUserUseCase };
