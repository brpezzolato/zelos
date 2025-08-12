    DROP DATABASE IF EXISTS zelos;
    CREATE DATABASE IF NOT EXISTS zelos;
    
    USE zelos;
    
	-- Criar tabela usuarios
	CREATE TABLE usuarios (
		id INT AUTO_INCREMENT PRIMARY KEY,
		nome VARCHAR(255) NOT NULL,
		senha VARCHAR(255) NOT NULL,
		email VARCHAR(255) NOT NULL UNIQUE,
		funcao VARCHAR(100) NOT NULL,
		status ENUM('ativo', 'inativo') DEFAULT 'ativo',
		criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
	);

	-- Inserir usuários de exemplo
	INSERT INTO usuarios (nome, senha, email, funcao, status)
	VALUES
	('Administrador', 'senha123', 'admin@example.com', 'admin', 'ativo'),
	('Técnico João', 'senha123', 'joao@example.com', 'tecnico', 'ativo'),
	('Suporte Maria', 'senha123', 'maria@example.com', 'suporte', 'ativo'),
	('Limpeza Pedro', 'senha123', 'pedro@example.com', 'limpeza', 'ativo');

	-- Criar tabela pool
	CREATE TABLE pool (
		id INT AUTO_INCREMENT PRIMARY KEY,
		titulo ENUM('externo', 'manutencao', 'apoio_tecnico', 'limpeza') NOT NULL,
		descricao TEXT,
		status ENUM('ativo', 'inativo') DEFAULT 'ativo',
		criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		created_by INT,
		updated_by INT,
		FOREIGN KEY (created_by) REFERENCES usuarios(id),
		FOREIGN KEY (updated_by) REFERENCES usuarios(id)
	);

	-- Inserir registros no pool
	INSERT INTO pool (titulo, descricao, status, created_by, updated_by)
	VALUES
	('externo', 'Suporte externo contratado para manutenção de equipamentos.', 'ativo', 1, 1),
	('manutencao', 'Equipe interna de manutenção preventiva.', 'ativo', 2, 2),
	('apoio_tecnico', 'Time de apoio técnico para problemas de software e hardware.', 'ativo', 3, 3),
	('limpeza', 'Serviço de limpeza e higienização de ambientes.', 'ativo', 4, 4);

    -- Criação da tabela `chamados`
    CREATE TABLE chamados (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        descricao TEXT NOT NULL,
        patrimonio INT NOT NULL,
        grau_prioridade ENUM('1', '2', '3', '4') DEFAULT '1',
        tipo_id INT,
        tecnico_id INT,
        usuario_id INT,
        status ENUM('pendente', 'em andamento', 'concluído') DEFAULT 'pendente',
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (tipo_id) REFERENCES pool(id),
        FOREIGN KEY (tecnico_id) REFERENCES usuarios(id),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    );

    -- Criação da tabela `apontamentos`
    CREATE TABLE apontamentos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        chamado_id INT,
        tecnico_id INT,
        descricao TEXT,
        comeco TIMESTAMP NOT NULL,
        fim TIMESTAMP NULL,
        duracao INT AS (TIMESTAMPDIFF(SECOND, comeco, fim)) STORED, -- Calcula a duração em segundos
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (chamado_id) REFERENCES chamados(id),
        FOREIGN KEY (tecnico_id) REFERENCES usuarios(id)
    );

    -- Criação da tabela `pool_tecnico`
    CREATE TABLE pool_tecnico (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_pool INT,
        id_tecnico INT,
        FOREIGN KEY (id_pool) REFERENCES pool(id),
        FOREIGN KEY (id_tecnico) REFERENCES usuarios(id)
    );

    -- Índices adicionais para otimização
    CREATE INDEX idx_usuarios_email ON usuarios(email);
    CREATE INDEX idx_chamados_status ON chamados(status);
    CREATE INDEX idx_apontamentos_comeco_fim ON apontamentos(comeco, fim);
