# LDS Notes Exporter 📜🚀

Uma ferramenta poderosa, privada e 100% client-side para exportar as tuas notas e diários do site oficial da Igreja (ChurchofJesusChrist.org) para formatos modernos e abertos.

## ✨ Funcionalidades

- **Privacidade Total**: O processamento é feito inteiramente no teu browser. Os teus dados nunca saem do teu computador.
- **Formatos de Exportação Flexíveis**:
  - 📝 **Markdown (.md)**: Perfeito para Obsidian, Logseq e Notion.
  - 📖 **Emacs Org Mode (.org)**: Estruturado para Emacs.
  - 🌐 **Rich HTML (.html)**: Preserva toda a formatação; ideal para Apple/Samsung Notes.
  - 📊 **Clean CSV (.csv)**: Tabela organizada para Excel ou Google Sheets.
  - 💻 **Clean JSON (.json)**: Dados estruturados e limpos para integrações.
  - 📄 **Plain Text (.txt)**: Simples e universal.
- **UX Moderna**: 
  - Interface minimalista com design "Monochrome".
  - **Drag & Drop**: Arrastar e largar ficheiros diretamente na área de upload.
  - **Notificações elegantes**: Sistema de *Toasts* para avisos e sucesso.
  - **Estatísticas em tempo real**: Visualiza o resumo do que importaste (Total de notas, diários, cadernos).

## 🚀 Como Usar

1. **Descarrega ou Clona**: Obtém o código deste repositório.
2. **Abre a App**: Dá um duplo clique no ficheiro `index.html` (não requer servidor).
3. **Segue o Assistente**:
   - **Ativação**: Abre a página oficial das notas da Igreja.
   - **Download**: Descarrega os teus dados da Igreja.
   - **Upload**: Arraste o ficheiro (JSON ou CSV) para a área indicada.
   - **Antevisão**: Explora as tuas notas, usa a pesquisa e vê as estatísticas.
   - **Exportar**: Escolhe o formato visualmente e descarrega o ZIP.

## 🛠️ Arquitetura Técnica

O projeto é 100% *client-side* (sem backend). A estrutura atual é modular:
- `/js/components/`: Controladores da Interface (Wizard, Preview, Export).
- `/js/exporters/`: Módulos de conversão de dados.
- `/js/parsers/`: Lógica de leitura de dados de entrada.
- `/js/services/`: Manipulação de ZIPs.
- `/js/utils/`: Normalização de dados e ajudantes.
- `/styles/`: CSS modular (base, layout, componentes).

## 📄 Licença
Distribuído sob a Licença MIT.
