import os

def gather_files_content(root_folder, file_types=None, max_char_count=None):
    """
    Gathers content from all files in the specified folder and its subfolders,
    excluding hidden files and folders. Only includes files with extensions in
    file_types and skips files that exceed max_char_count.

    Args:
        root_folder (str): The root folder to start the search from.
        file_types (list of str): List of file extensions to include (e.g., ['.txt', '.py']).
        max_char_count (int): Maximum number of characters allowed per file.

    Returns:
        str: A string containing all file contents formatted as specified.
    """

    output = []

    for dirpath, dirnames, filenames in os.walk(root_folder):
        # Exclude hidden directories
        dirnames[:] = [d for d in dirnames if not d.startswith('.')]

        for filename in filenames:
            if filename.startswith('.'):
                continue  # Skip hidden files

            file_path = os.path.join(dirpath, filename)
            file_ext = os.path.splitext(filename)[1]

            if file_types and file_ext not in file_types:
                continue  # Skip files that are not in the specified file types

            try:
                with open(file_path, 'r', encoding='utf-8') as file:
                    file_content = file.read()
                    if max_char_count and len(file_content) > max_char_count:
                        continue  # Skip files that exceed the character limit

                    # Format the output for each file
                    output.append(f"### **File: `{file_path}`**\n```{file_ext[1:]}\n{file_content}\n```")
            except (UnicodeDecodeError, FileNotFoundError, PermissionError) as e:
                print(f"Skipping file {file_path}: {e}")
                continue  # Skip files that cannot be read

    return "\n\n".join(output)

# Example usage:
#result = gather_files_content('src', file_types=['.json', '.md','.js', '.css','.jsx'], max_char_count=10000)
#print(result)


import os

def gather_files_content(root_folder, output_file, file_types=None, max_char_count=None):
    """
    Gathers content from all files in the specified folder and its subfolders,
    excluding hidden files and folders. Only includes files with extensions in
    file_types and skips files that exceed max_char_count. Writes the output to a file.
    
    Args:
        root_folder (str): The root folder to start the search from.
        output_file (str): The name of the file to write the output to.
        file_types (list of str): List of file extensions to include (e.g., ['.txt', '.py']).
        max_char_count (int): Maximum number of characters allowed per file.
    """
    with open(output_file, 'w', encoding='utf-8') as out_file:
        for dirpath, dirnames, filenames in os.walk(root_folder):
            # Exclude hidden directories
            dirnames[:] = [d for d in dirnames if not d.startswith('.')]
            for filename in filenames:
                if filename.startswith('.'):
                    continue  # Skip hidden files
                file_path = os.path.join(dirpath, filename)
                file_ext = os.path.splitext(filename)[1]
                if file_types and file_ext not in file_types:
                    continue  # Skip files that are not in the specified file types
                try:
                    with open(file_path, 'r', encoding='utf-8') as file:
                        file_content = file.read()
                        if max_char_count and len(file_content) > max_char_count:
                            continue  # Skip files that exceed the character limit
                        # Write the formatted output for each file
                        out_file.write(f"### **File: `{file_path}`**\n```{file_ext[1:]}\n{file_content}\n```\n\n")
                except (UnicodeDecodeError, FileNotFoundError, PermissionError) as e:
                    print(f"Skipping file {file_path}: {e}")
                    continue  # Skip files that cannot be read

# Example usage:
gather_files_content('src', 'output.txt', file_types=['.json', '.md', '.js', '.css', '.jsx'], max_char_count=10000)