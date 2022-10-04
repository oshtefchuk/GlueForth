using System;
using System.Collections.Specialized;
using System.Configuration;

namespace Bit.EA.WorkflowTools
{
	public static class ConfigLoader
	{
		static ConfigLoader()
		{
			Reset();
		}

		/// <summary>
		/// Reset AppSettings and ConnectionStrings to default (i.e. ConfigurationManager mappings)
		/// </summary>
		private static void Reset()
		{
			_appSettings = new Lazy<NameValueCollection>(() => ConfigurationManager.AppSettings);
			_connectionStrings = new Lazy<ConnectionStringSettingsCollection>(() => ConfigurationManager.ConnectionStrings);
		}

		private static Configuration _configuration;
		private static string _path;

		/// <summary>
		/// Path to the actual configuration file
		/// </summary>
		public static string Path
		{
			get { return _path ?? ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None).FilePath; }
			set
			{
				if (_path != value)
				{
					_path = value;
					_configuration = ConfigurationManager.OpenMappedExeConfiguration(new ExeConfigurationFileMap { ExeConfigFilename = value }, ConfigurationUserLevel.None);
					if (_configuration == null)
					{
						Reset();
					}
					else
					{
						_appSettings = new Lazy<NameValueCollection>(() =>
						{
							var nvc = new NameValueCollection();
							foreach (KeyValueConfigurationElement setting in _configuration.AppSettings.Settings)
							{
								nvc.Add(setting.Key, setting.Value);
							}
							return nvc;
						});
						_connectionStrings = new Lazy<ConnectionStringSettingsCollection>(() => _configuration.ConnectionStrings.ConnectionStrings);
					}
				}
			}
		}

		private static Lazy<NameValueCollection> _appSettings;
		public static NameValueCollection AppSettings
		{
			get { return _appSettings.Value; }
		}

		private static Lazy<ConnectionStringSettingsCollection> _connectionStrings;
		public static ConnectionStringSettingsCollection ConnectionStrings 
		{
			get { return _connectionStrings.Value; }
		}
	}
}
