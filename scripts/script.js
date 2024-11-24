const supabaseUrl = 'aHR0cHM6Ly9taXN5ZmNuZnlua2FoYWNzZGVhcS5zdXBhYmFzZS5jbw==';
const supabaseKey = 'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBj' +
                    'M01pT2lKemRYQmhZbUZ6WlNJc0luSmxaaUk2SW0xcGMzbG1ZMjVtZVc1' +
                    'cllXaGhZM05rWldGeElpd2ljbTlzWlNJNkltRnViMjRpTENKcFlYUWlP' +
                    'akUzTWpreE9Ua3hOaklzSW1WNGNDSTZNakEwTkRjM05URTJNbjAuY1VO' +
                    'c3FpcHBDc0ROdElQMmRzbWNtWkFMbkNQbUhqajFOMWIzNHBQVzlucw=='

const decodedUrl = atob(supabaseUrl);
const decodedKey = atob(supabaseKey);

const supabase = createClient(decodedUrl, decodedKey);