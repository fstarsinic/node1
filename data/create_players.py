import pandas as pd

# Read the original CSV file
df = pd.read_csv('players.csv')

# Split the 'player' column into 'firstname' and 'lastname'
df[['firstname', 'lastname']] = df['player'].str.split(' ', 1, expand=True)

# Add an 'id' column with integer values
df['id'] = range(1, len(df) + 1)

# Reorder the columns
df = df[['id', 'player', 'firstname', 'lastname']]

# Save the modified DataFrame to a new CSV file
df.to_csv('players_modified.csv', index=False)

print("File 'players_modified.csv' has been created.")

